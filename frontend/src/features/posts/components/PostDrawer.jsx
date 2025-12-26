import { X, Tag } from 'lucide-react';

const PostDrawer = ({ isOpen, onClose, post }) => {
    return (
        <>
            <div
                className={`fixed inset-0 bg-black/20 transition-opacity z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer Panel */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold">{post ? 'Edit Post' : 'Create New Post'}</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
                    </div>

                    <form className="flex-1 space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input defaultValue={post?.title} type="text" className="w-full p-3 border rounded-lg" placeholder="Something catchy..." />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Content</label>
                            <textarea defaultValue={post?.content} className="w-full p-3 border rounded-lg h-40" placeholder="What's on your mind?" />
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 flex items-center gap-2">
                                <Tag size={16} /> Tags
                            </label>
                            <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-gray-50">
                                {post?.tags?.map(t => <span key={t} className="px-2 py-1 bg-white border rounded text-xs">#{t}</span>)}
                                <input className="bg-transparent outline-none text-sm" placeholder="Add tag..." />
                            </div>
                        </div>
                    </form>

                    <div className="pt-6 border-t flex gap-3">
                        <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-bold">Save Post</button>
                        <button onClick={onClose} className="px-6 py-3 border rounded-lg">Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDrawer;