// Write your code here
import './index.css'

const AppointmentItem = props => {
  console.log('Hello')
  const {appointmentDetails, toggleLike, deleteAppointment} = props
  const {
    id,
    appointment,
    appointmentDate,
    appointmentsList,
    isStarred,
  } = appointmentDetails
  console.log(appointmentDetails)
  const likeButton = () => {
    toggleLike(id)
    console.log('Image clicked')
  }
  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-content-container">
      <div className="card-top-container">
        <p>{appointment}</p>
        <button className="star-button" onClick={likeButton} data-testid="star">
          <img src={imgUrl} className="star-image" alt="star" />
        </button>
      </div>
      <p className="date-style">{appointmentDate}</p>
    </li>
  )
}

export default AppointmentItem
