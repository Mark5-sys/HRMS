export const employeeStatus = (status) => {
  if (status === "Active") {
    return (
      <span
        className="badge badge-pill badge-success"
        style={{
          padding: "10px 9px",
          borderRadius: "20px",
        }}
      >
        {status}
      </span>
    );
  } else if (status === "Orientation") {
    return (
      <span
        className="badge badge-pill badge-primary"
        style={{
          padding: "10px 9px",
          borderRadius: "20px",
        }}
      >
        {status}
      </span>
    );
  } else {
    return (
      <span
        className="badge badge-pill badge-warning"
        style={{
          padding: "10px 9px",
          borderRadius: "20px",
        }}
      >
        {status}
      </span>
    );
  }
};
