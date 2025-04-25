import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getserverbyid, editServer} from '../api/server';
import { useAuth } from '../contexts/AuthContext';
import { Toastcomponent } from './Toast';

const EditForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { serverid } = useParams();

  const [serverData, setServerData] = useState({
    name: '',
    description: '',
    githubRepo: '',
    tags: '',
    sections: [{ title: '', details: '' }],
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serverid) {
      setError('No server ID provided.');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await getserverbyid(decodeURIComponent(serverid));
        const { name, description, githubRepo, tags, sections } = res.data;
        setServerData({
          name,
          description,
          githubRepo,
          tags: tags.join(','),
          sections,
        });
      } catch (err) {
        console.error('Error loading server:', err);
        setError('Could not load server details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serverid]);

  const handleChange = (e) => {
    setServerData({ ...serverData, [e.target.name]: e.target.value });
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...serverData.sections];
    updatedSections[index][field] = value;
    setServerData({ ...serverData, sections: updatedSections });
  };

  const addSection = () => {
    setServerData({
      ...serverData,
      sections: [...serverData.sections, { title: '', details: '' }],
    });
  };

  const removeSection = (index) => {
    const updatedSections = serverData.sections.filter((_, i) => i !== index);
    setServerData({ ...serverData, sections: updatedSections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...serverData,
      tags: serverData.tags.split(',').map((tag) => tag.trim()),
      submittedBy: user?._id,
    };

    try {
      await editServer(serverid, payload);
      navigate('/servers');
    } catch (err) {
      console.error(err);
      setError('Failed to update server.');
    }
  };

  if (error) return <Toastcomponent message={error} />;
  if (loading) return <div className="text-center mt-6">Loading server data...</div>;

  return (
    <form
    onSubmit={handleSubmit}
    className="p-6 max-w-3xl mx-auto space-y-8 bg-white dark:bg-gray-900 rounded-xl shadow-md"
  >
    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
      Edit Server
    </h1>
  
    <div className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Server Name"
        value={serverData.name}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        required
      />
  
      <textarea
        name="description"
        placeholder="Description"
        value={serverData.description}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        required
        rows={4}
      />
  
      <input
        type="text"
        name="githubRepo"
        placeholder="GitHub Repo URL"
        value={serverData.githubRepo}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
  
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma-separated)"
        value={serverData.tags}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </div>
  
    <div className="space-y-6">
      {serverData.sections.map((section, index) => (
        <div
          key={index}
          className="relative space-y-3 border border-gray-300 dark:border-gray-700 p-4 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800"
        >
          <input
            type="text"
            placeholder="Section Title"
            value={section.title}
            onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
          <textarea
            placeholder="Details"
            value={section.details}
            onChange={(e) => handleSectionChange(index, 'details', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            rows={3}
          />
          {serverData.sections.length > 1 && (
           <button
           type="button"
           onClick={() => removeSection(index)}
           className="absolute top-2 right-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 p-1 rounded-full transition  cursor-pointer"
           aria-label="Remove Section"
         >
           <svg
             xmlns="http://www.w3.org/2000/svg"
             className="h-4 w-4"
             viewBox="0 0 20 20"
             fill="currentColor"
           >
             <path
               fillRule="evenodd"
               d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 
               1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 
               1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 
               10 4.293 5.707a1 1 0 010-1.414z"
               clipRule="evenodd"
             />
           </svg>
         </button>
         
          )}
        </div>
      ))}
    </div>
  
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mt-6">
      <button
        type="button"
        onClick={addSection}
        className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition cursor-pointer"
      >
        + Add Section
      </button>
  
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition cursor-pointer"
      >
        Save Changes
      </button>
    </div>
  </form>
  
  );
};

export default EditForm;
