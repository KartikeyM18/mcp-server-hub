import EditForm from "../components/EditForm"
export default function EditServer() {
    return (
        <div className="bg-gray-950 min-h-screen text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4 text-center">Edit Your Server here</h1>
          <EditForm/>
        </div>
    </div>
    )
}