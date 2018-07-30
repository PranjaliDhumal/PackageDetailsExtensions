import React from "react";
import _ from "lodash";
import { Button, Icon, Popup, Search, Checkbox } from "semantic-ui-react";
const searchRenderer = ({ title }) => <div>{title}</div>;
export default class PackageDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packageId: props.packageId,
      packageName: props.packageName,
      isBVBrequired: props.isBVBrequired,
      selectedTypeId: props.selectedTypeId,
      itemTypes: props.itemTypes,
      isLoading: false,
      isPopUpOpen: false,
      selectedTypeName: "",
      selectedTypeNamePackage: [],
      results: [],
      itemType: []
    };
    this.handleBVBRequest = this.handleBVBRequest.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.defaultSelectedTypeId = this.defaultSelectedTypeId.bind(this);
  }
  componentDidMount() {
    var itemTypes = [];

    this.state.itemTypes.map(item => {
      var ItemType = {
        text: item.name,
        value: item.id,
        key: item.id,
        title: item.name
      };
      itemTypes.push(ItemType);
    });
    this.setState({ itemTypes: itemTypes });
  }

  resetComponent = () => {
    this.setState(ps => {
      return {
        ...ps,
        isLoading: false,
        results: [],
        selectedTypeName: "",
        selectedTypeNamePackage: []
      };
    });
  };
  handleSearchChange = (e, { value }) => {
    this.setState(ps => {
      return {
        ...ps,
        isLoading: true,
        selectedTypeName: value,
        selectedTypeNamePackage: []
      };
    });
    setTimeout(() => {
      if (this.state.selectedTypeName.length < 1) return this.resetComponent();
      const re = new RegExp(_.escapeRegExp(this.state.selectedTypeName), "i");
      const isMatch = result => re.test(result.title);
      this.setState({
        isLoading: false,
        results: _.filter(this.state.itemTypes, isMatch)
      });
    }, 300);
  };

  defaultSelectedTypeId = selectedTypeId => {
    this.state.itemTypes.map(item => {
      return item.id === selectedTypeId ? item.name : null;
    });
  };
  handleBVBRequest = (e, { isBVBrequired }, packageId) => {
    var bvbrequired = this.state.isBVBrequired === true ? false : true;

    console.log(this.state.isBVBrequired);
    this.setState(ps => {
      return {
        ...ps,
        isBVBrequired: bvbrequired
      };
    });
  };
  render() {
    return (
      <div>
        <br />
        <Popup trigger={<Button>Popup</Button>} hoverable={false} on="click">
          <Checkbox
            // disabled={!!this.state.isBVBrequired}
            defaultChecked={
              this.state.isBVBrequired !== undefined && this.state.isBVBrequired
            }
            onChange={e =>
              this.handleBVBRequest(
                e,
                this.state.isBVBrequired,
                this.state.packageId
              )
            }
            style={{ marginRight: "10px" }}
          />{" "}
          BVB required for{" "}
          <span style={{ color: "orange" }}>'{this.state.packageName}'</span>
          <Search
            // defaultValue={this.defaultSelectedTypeId}
            loading={this.state.isLoading}
            onResultSelect={(e, { result }) =>
              this.setState(ps => {
                return {
                  ...ps,
                  selectedTypeNamePackage: result,
                  selectedTypeName: result.title
                };
              })
            }
            onSearchChange={this.handleSearchChange}
            resultRenderer={searchRenderer}
            results={this.state.results}
            value={this.selectedTypeName}
          />
        </Popup>
      </div>
    );
  }
}
