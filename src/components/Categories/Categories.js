import { Component } from "react";
import CategoryNavigation from "./CategoryNavigation/CategoryNavigation";
import Pet from "../Pet/Pet";
import * as petService from "../../service/petService";

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: [],
      currentCategory: "all",
    };
  }

  componentDidMount() {
    petService.getAll().then((res) => this.setState({ pets: res }));
  }

  componentDidUpdate(prevProps, prevState) {
    const category = this.props.match.params.category;
    if (prevProps.match.params.category == category) {
      return;
    }
    petService.getAll(category).then((res) =>
      this.setState({
        pets: res,
        currentCategory: this.props.match.params.category,
      })
    );
  }

  render() {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        <CategoryNavigation />
        <ul className="other-pets-list">
          {this.state.pets.map((x) => (
            <Pet key={x.id} {...x} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Categories;
