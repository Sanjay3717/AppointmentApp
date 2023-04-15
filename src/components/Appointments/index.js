// Write your code here
import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isFavorite: false,
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onDateChange = event => {
    this.setState({date: event.target.value})
  }

  onAddButton = event => {
    const {appointmentsList, title, date} = this.state
    event.preventDefault()
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      appointment: title,
      appointmentDate: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onClickFilter = () => {
    const {isFavorite} = this.state
    this.setState({
      isFavorite: !isFavorite,
    })
  }

  onToggleClick = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }

        return eachAppointment
      }),
    }))
  }

  getFilteredAppointmentList = () => {
    const {appointmentsList, isFavorite} = this.state
    if (isFavorite) {
      appointmentsList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {appointmentsList, title, date, isFavorite} = this.state
    console.log(isFavorite)
    const filteredAppointmentList = this.getFilteredAppointmentList()

    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="top-container">
            <div className="left-container">
              <h1 className="main-heading">Add Appointment </h1>
              <form onSubmit={this.onAddButton}>
                <label htmlFor="title" className="title-text">
                  TITLE
                </label>{' '}
                <br />
                <input
                  type="text"
                  placeholder="Title"
                  id="title"
                  className="title-input"
                  onChange={this.onTitleChange}
                  value={title}
                />{' '}
                <br />
                <label htmlFor="select-date" className="title-text">
                  DATE
                </label>{' '}
                <br />
                <input
                  type="date"
                  id="select-date"
                  className="title-input"
                  onChange={this.onDateChange}
                  value={date}
                />
                <div>
                  <button className="add-btn-style" onClick={this.onAddButton}>
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="right-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
          </div>

          <hr className="line-style" />
          <div className="middle-container">
            <h1>Appointments</h1>
            <button
              className="remove-button"
              onClick={this.getFilteredAppointmentList}
            >
              Starred
            </button>
          </div>
          <div className="bottom-container">
            <ul className="appointment-items-style">
              {filteredAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleLike={this.onToggleClick}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
