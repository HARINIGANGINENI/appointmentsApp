import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }
,
  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const formatDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ' '

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formatDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, appointmentsList, isFilterActive} = this.state
    const filteredAppointmentsList=this.getFilteredAppointmentsList()

 return (
      <div className="bg-container">
        <div className="appointments-container">
          <h1>Add Appointment</h1>
          <div className="title-container">
            <form onSubmit={this.onAddAppointment}>
              <label htmlFor="title" className="title">
                TITLE
              </label>
              <input
                type="text"
                value={titleInput}
                id="title"
                onChange={this.onChangeTitle}
                placeholder="title"
              />
              <label htmlFor="date" className="date">
                Date
              </label>
              <input
                type="Date"
                value={dateInput}
                id="date"
                onChange={this.onChangeDate}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="line" />
          <div className="user-appointments-container">
            <h1 className="heading">Appointments</h1>
            <button type="button" onClick={this.onClickFilter}>
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments