import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem'
import { Spinner } from './Spinner';

export default class News extends Component {

  constructor(props) {   //runs before render() method
    super(props);
    this.state = {
      articles: [],         //setting a state 
      loading: false,
      page: 1,
      totalResults:0
      //it tells the no of articles on a page
    }
    document.title = `NewsMonkey-${this.props.name}`;
  }

  async componentDidMount() {
    //it is a lifecycle method which runs after render() method
    //sequence: constructor -> render() ->React Updates DOM and refs ->ComponentDidMount()
    //Updating takes place when we browser gets new props or new state is passed or it is forced update->function is ComponentDidUpdate()
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=df9e4829c4704b99a8b9f89dceae82e7&page=1&pageSize=${this.props.pageSize}`
    this.setState({ loading: true });
    let data = await fetch(url);//async and await is used to wait for the promise of fetch and than work asynchronously
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
  }
  // handlePrevClick = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=df9e4829c4704b99a8b9f89dceae82e7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true })
  //   let data = await fetch(url);//async and await is used to wait for the promise of fetch and than work asynchronously
  //   let parsedData = await data.json()
  //   console.log(parsedData);
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false
  //   })
  // }
  // handleNextClick = async () => {
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=df9e4829c4704b99a8b9f89dceae82e7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //     this.setState({ loading: true })
  //     let data = await fetch(url);//async and await is used to wait for the promise of fetch and than work asynchronously
  //     let parsedData = await data.json()
  //     console.log(parsedData);
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parsedData.articles,
  //       loading: false
  //     })
  //   }
  // }
  fetchMoreData=async()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=df9e4829c4704b99a8b9f89dceae82e7&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
      this.setState({
          page:this.state.page + 1
      })
      
    this.setState({ loading: true });
    let data = await fetch(url);//async and await is used to wait for the promise of fetch and than work asynchronously
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles:this.state.articles.concat(parsedData.articles), 
      totalResults: parsedData.totalResults, 
      loading: true })
  }
  render() {
    return (
      <div>
        <h1 className="text-center" style={{ margin: "30px 10px",marginTop:"90px" }}>NewsMonkey - Top Headlines from {this.props.name} </h1>
        {/* {this.state.loading && <Spinner />} */}
        {/* this statement says that show spinner component when loading is true */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}>
            <div className='container'>

          
          <div className="row">
            {this.state.articles.map((element) => {  //using state and saying data will remain always there
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url}
                  author={element.author} date={element.publishedAt} source={element.source.name} />
                {/* slice method specifies the length of characters */}
              </div>
            })}

          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }
}
