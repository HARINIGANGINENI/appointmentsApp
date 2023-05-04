const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-container">
      <div className="appointment-bg">
        <p className="title">{title}</p>
        <button onClick={onClickStar} type="button" data-testid="star">
          <img src={starImgUrl} alt="star" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}
export default AppointmentItem
