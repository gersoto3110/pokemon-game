import "./Wrapper.css";

const Wrapper = ({ children, transform, zIndex, backgroundColor }) => {
  const style = {
    transform: transform,
    zIndex: zIndex,
    backgroundColor: backgroundColor,
  };

  return (
    <section className="wrapper" style={style}>
      {children}
    </section>
  );
};

export default Wrapper;
