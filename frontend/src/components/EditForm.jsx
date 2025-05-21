import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getserverbyid, editServer } from '../api/server';
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
      className="max-w-4xl mx-auto px-6 py-10 bg-white dark:bg-gray-950 rounded-2xl shadow-xl space-y-8 transition-all"
    >
      <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-white">Edit Server</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          type="text"
          name="name"
          placeholder="Server Name"
          value={serverData.name}
          onChange={handleChange}
          className="col-span-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
          required
        />

        <input
          type="text"
          name="githubRepo"
          placeholder="GitHub Repo URL"
          value={serverData.githubRepo}
          onChange={handleChange}
          className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={serverData.tags}
          onChange={handleChange}
          className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        />
      </div>

      <textarea
        name="description"
        placeholder="Description"
        value={serverData.description}
        onChange={handleChange}
        className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        rows={5}
        required
      />

      <div className="space-y-6">
        {serverData.sections.map((section, index) => (
          <div
            key={index}
            className="relative border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-xl p-5 shadow-sm space-y-4"
          >
            <input
              type="text"
              placeholder="Section Title"
              value={section.title}
              onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Details"
              value={section.details}
              onChange={(e) => handleSectionChange(index, 'details', e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            {serverData.sections.length > 1 && (
              <button
                type="button"
                onClick={() => removeSection(index)}
                className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full transition"
                aria-label="Remove Section"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
        <button
          type="button"
          onClick={addSection}
          className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-lg transition cursor-pointer"
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
