const CustomDate = ({
  field,
  ...props
}) => (
  <div>
    <input type="date" {...field} {...props} min="1990-01-01" />
  </div>
);

export default CustomDate;