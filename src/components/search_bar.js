import React, {Component} from 'react';
// const SearchBar = () =>{
//   return <input />; //React still need to be imported coz React.createElement here
// };

class SearchBar extends Component{
  constructor(props){
      super(props);
      this.state = {term: ''};
  }

  render(){
    return (
      <div className="search-bar">
        <input
        value={this.state.term}
        onChange={event=>this.onInputChange(event.target.value)}/>
      </div>
    );
  }

  onInputChange(term){
    this.setState({term});
    this.props.onSearchTermChange(term);
  }

}

export default SearchBar;
