import ServerDetails from "../components/ServerDetails"
export default function Server() {
    return (
        <div className="bg-gray-950 min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4"></h1>
                <ServerDetails/>
            </div>
        </div>
    )
}