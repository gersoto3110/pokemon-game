import "./Loading.css"

const Loading = ({color}) => {
  const style = {
    "--color": color ? color : "rgb(1, 154, 255)",
  }
  return (
    <div className="lds-dual-ring" style={style}></div>
  )
}

export default Loading