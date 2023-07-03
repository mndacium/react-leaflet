
export default function DistrictsList({ loading,districts, level, handleChange }) {
  if(loading) return <div>Loading..</div>
  if(!loading) return(
    <div>
      {districts.features.map((item, index) => {
        return (
          <p
            key={index}
            style={{
              fontSize: `20px`,
            }}
            className="button"
            onClick={() => handleChange(item)}
          >{`District ${item.properties[`lvl${level}_name`]}`}</p>
        );
      })}
    </div>
  );
}
