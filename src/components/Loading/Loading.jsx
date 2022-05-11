import "./Loading.css"

const Loading = ({color, sizeBorder, size, afterSize}) => {
  const style = {
    "--color": color ? color : "rgb(1, 154, 255)",
    "--size": size ? size : "5rem",
    "--size-border": sizeBorder ? sizeBorder : ".5rem",
    "--after-size": afterSize ? afterSize : "4rem",
  }
  return (
    <div className="lds-dual-ring" style={style}></div>
  )
}

export default Loading