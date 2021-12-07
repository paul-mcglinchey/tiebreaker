import { useMountEffect } from '../../helpers/useMountEffect';

const CustomTagger = (props) => {

  const addEnterListener = () => {
    window.addEventListener("keyup", event => {
      if (event.code === 'Enter') {
        console.log('Enter is pressed!');
      }
    })
  }

  useMountEffect(addEnterListener);

  const handleChange = () => {
  }

  return (
    <div className="flex flex-col flex-1">
      <label htmlFor="notes">Notes</label>
      <input name="notes" onChange={() => handleChange()} className="border border-blue-500" type="text"></input>
    </div>
  )
}

export default CustomTagger;