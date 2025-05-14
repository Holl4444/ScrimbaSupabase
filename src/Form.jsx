function Form({ metrics }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;
  };

  const generateOptions = () => {
    return metrics.map((metric) => (
      <option key={metric.name} value={metric.name}>
        {metric.name}
      </option>
    ));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <select onChange={handleChange} name="name">
            {generateOptions()}
          </select>
        </label>
        <label>
          Amount: $
          <input
            type="number"
            name="value"
            onChange={handleChange}
            className="amount-input"
            min="0"
            step="10"
          />
        </label>
        <button>Add Deal</button>
      </form>
    </div>
  );
}

export default Form;
