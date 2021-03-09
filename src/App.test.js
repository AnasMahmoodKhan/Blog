import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import App from "./App";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import store from "./app/store";
import Blogs from "./components/Blogs";
import Homepage from "./components/Homepage";

configure({ adapter: new Adapter() });

describe("Testing Blog", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders Login With Google", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const linkElement = screen.getByText("Login With Google");
    expect(linkElement).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Blogs Component", () => {
  let component = shallow(
    <Provider store={store}>
      <Blogs />
    </Provider>
  );

  it("Should render without errors", () => {
    const wrapper = component.find(".blog__page");
    console.log(wrapper.length);
    expect(wrapper.length).toBe(1);
  });

  it("Should render blogs", () => {
    const blogs = component.find(".blogs");
    expect(blogs.length).toBe(1);
  });
});

describe("Homepage Component", () => {
  let component = shallow(
    <Provider store={store}>
      <Homepage />
    </Provider>
  );

  it("Should render without errors", () => {
    const wrapper = component.find(".home_page");
    console.log(wrapper.length);
    expect(wrapper.length).toBe(1);
  });
  
});
