import React, {Component} from 'react';//work with components
import ReactDOM from 'react-dom';//work with rendering components INTO DOM
import YTSearch from 'youtube-api-v3-search';
import _ from 'lodash';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyC4hQaaxHAVmE9ar0anpEhmvMql49rWOTs';

const options = {
  q:'cats',
  part:'snippet',
  // pageToken:'CAUQAA',
  // maxResults:25,
  type:'video'
}

//create a new component with JSX
class App extends Component{
  constructor(props){
    super(props);
    this.state={
      videos:[],
      selectedVideo:null
    };

    this.videoSearch('cats');

  }

  videoSearch(q){
    YTSearch(API_KEY,{q, part:'snippet', type:'video'}).then(
      data=>{
        this.setState({
          videos: data.items,
          selectedVideo: data.items[0]
        });
      }
    )
  }

  render(){
    const videoSearch = _.debounce((term)=>{this.videoSearch(term)},300);
    return(
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
        onVideoSelect={selectedVideo=>this.setState({selectedVideo})}
        videos={this.state.videos}/>
      </div>
    );
  }
}

//Take this component and put it into the DOM
ReactDOM.render(<App/>,document.querySelector('.container'));//Need to instantiate a component instead of passing a component class
//App is just returning a JSX template
//Wrapping with JSX tag will create a component instance with --> React.createElement("...."),
