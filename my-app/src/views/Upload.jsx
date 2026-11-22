import {useState} from 'react';
import {useNavigate} from 'react-router';
import useForm from '../hooks/formHooks.js';
import {useFile, useMedia} from '../hooks/apiHooks.js';

const Upload = () => {
  const [file, setFile] = useState(null);

  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const navigate = useNavigate();



  const initValues = {
    title: '',
    description: '',
  };

  const doUpload = async () => {
    try {
      // TODO: call postFile function (see below)
      // TODO: call postMedia function (see below)
      // TODO: redirect to Home

      const token = localStorage.getItem('token');
      const fileResult = await postFile(file, token);
      console.log('file result:', fileResult);
      const mediaResult = await postMedia(fileResult.data, inputs, token);
      console.log('media result:', mediaResult);
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doUpload,
    initValues,
  );

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };
a
  return (
    <div className="mx-auto max-w-md p-8">
      <h1 className="text-3xl font-bold text-blue-800">Upload</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <div>
          <label htmlFor="title" className="block font-bold text-blue-800">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            className="w-full mt-1 rounded-full border-2 border-blue-800 bg-white px-4 py-2 focus:outline-none focus:border-emerald-600"
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-bold text-blue-800">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            className="w-full mt-1 rounded-2xl border-2 border-blue-800 bg-white px-4 py-2 focus:outline-none focus:border-emerald-600"
          ></textarea>
        </div>
        <div>
          <label htmlFor="file" className="block font-bold text-blue-800">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            className="w-full mt-1 rounded-full border-2 border-blue-800 bg-white px-4 py-2 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-600 file:px-4 file:py-1 file:text-white hover:file:bg-emerald-500"
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://placehold.co/200?text=Choose+image'
          }
          alt="preview"
          className="mx-auto rounded-xl"
          width="200"
        />
        <button
          type="submit"
          disabled={file && inputs.title.length > 3 ? false : true}
          className="self-center rounded-full bg-emerald-600 px-3 py-1 text-sm text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload
