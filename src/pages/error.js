

export default function Error ({msg}) {
  
  return (
    <div className="center-error">
      <p>{decodeURI(msg)}</p>
    </div>
  )
}