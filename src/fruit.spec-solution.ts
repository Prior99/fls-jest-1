import Fruit from "./fruit.vue";
import { Api } from "./api";
import { mount, Wrapper } from "@vue/test-utils";

describe("Fruit", () => {
    let fruit: Wrapper<Fruit>;
    let api: Api;
    let apiSpy: jest.SpyInstance<any>;
    const someId = 67;

    beforeEach(() => {
        api = new Api("http://example.com");
        apiSpy = jest.spyOn(api, "getFruitDetails").mockImplementation(async () => ({
            "category_url": "/shop/categories/Fresh",
            "name": "Mango fresh",
            "photo_url": "/shop/products/62/photo",
            "price": 5.55,
            "vendor_url": "/shop/vendors/672",
        }));
        fruit = mount(Fruit, {
            propsData: { id: someId },
            provide: { api },
        });
    });

    it("matches the snapshot", () => expect(fruit).toMatchSnapshot());

    describe("after the api call has been done", () => {
        beforeEach(() => new Promise(resolve => setTimeout(resolve)));

        it("matches the snapshot", () => expect(fruit).toMatchSnapshot());

        it("calls the api with the expected id", () => expect(apiSpy).toHaveBeenCalledWith(someId));

        it("displays the name", () => expect(fruit.find("h1").text()).toBe("Mango fresh"));

        it("displays the image", () => expect(fruit.find("img").attributes().src).toBe("/shop/products/62/photo"));

        it("does not display favorite message", () => expect(fruit.find("p").exists()).toBe(false));

        describe("when clicking the favorite button", () => {
            beforeEach(() => fruit.find("button").trigger("click"));

            it("matches the snapshot", () => expect(fruit).toMatchSnapshot());

            it("displays favorite message", () => expect(fruit.find("p").exists()).toBe(true));

            describe("when clicking the favorite button again", () => {
                beforeEach(() => fruit.find("button").trigger("click"));

                it("matches the snapshot", () => expect(fruit).toMatchSnapshot());

                it("displays favorite message", () => expect(fruit.find("p").exists()).toBe(false));
            });
        });
    });
});
