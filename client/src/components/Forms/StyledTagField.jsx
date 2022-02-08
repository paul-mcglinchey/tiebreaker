import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { StyledConfirmationMessage, StyledErrorMessage } from ".";

const StyledTagField = ({ tags, setTags, label, errors, touched }) => {

  const [tag, setTag] = useState('');

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      addTag();
    }
  }

  const addTag = () => {
    setTags([...tags, { value: tag, id: uuidv4() }])
    setTag('');
  }

  const removeTag = (tagId) => {
    setTags(tags.filter(t => t.id !== tagId));
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-between">
        <label className="block font-bold text-gray-500 mb-1 uppercase">
          {label}
        </label>
        <div className="flex justify-end">
          {errors && touched ? (
            <StyledErrorMessage>{errors}</StyledErrorMessage>
          ) : null}
          {!errors && touched ? (
            <StyledConfirmationMessage />
          ) : null}
        </div>
      </div>
      <div className="flex w-full h-10 px-2 text-gray-200 items-center space-x-2 border-2 border-transparent bg-gray-800 focus-within:border-blue-500 rounded-sm">
        <div className="flex space-x-2">
          {tags && (
            tags.map((t) => (
              <button
                className="bg-gray-900 px-2 rounded hover:bg-red-500 transition-all select-none"
                key={t.id}
                onClick={() => removeTag(t.id)}
              >
                {t.value}
              </button>
            ))
          )}
        </div>
        <input className="flex-grow bg-transparent focus:outline-none" id="tagField" name="tags" value={tag} onChange={(e) => setTag(e.target.value)} />
        <div className="font-semibold text-gray-500/50">
          Enter to add
        </div>
      </div>
    </div>
  )
}

export default StyledTagField;