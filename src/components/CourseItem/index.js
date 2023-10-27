import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Item from '../Item'

import './index.css'

const apStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
}

class CourseItem extends Component {
  state = {ap: apStatus.initial, courseList: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({ap: apStatus.loading})
    const url = ' https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formatData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({courseList: formatData, ap: apStatus.success})
    } else {
      this.setState({ap: apStatus.fail})
    }
  }

  loadingView = () => (
    <div data-testid="loader" className="loader-con">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {courseList} = this.state
    return (
      <div className="s-con">
        <h1 className="header">Courses</h1>
        <ul>
          {courseList.map(i => (
            <Item details={i} key={i.id} />
          ))}
        </ul>
      </div>
    )
  }

  failView = () => (
    <div>
      <Link to="/" className="link-el">
        <navbar>
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
          />
        </navbar>
      </Link>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went wRONG</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button type="button" onClick={this.getData}>
          Retry
        </button>
      </div>
    </div>
  )

  finalRender = () => {
    const {ap} = this.state
    switch (ap) {
      case apStatus.loading:
        return this.loadingView()
      case apStatus.success:
        return this.successView()
      case apStatus.fail:
        return this.failView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Link to="/" className="link-el">
          <navbar>
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
            />
          </navbar>
        </Link>
        {this.finalRender()}
      </div>
    )
  }
}

export default CourseItem
