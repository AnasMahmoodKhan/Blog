import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import App from "./App";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import store from "./app/store";

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
