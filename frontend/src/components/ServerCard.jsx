import React from 'react'

const ServerCard = ({name, description}) => {
    return (
        <div class="rounded-xl border border-gray-300 shadow h-full flex flex-col transition-colors">
            <div class="flex-1 flex flex-col">
                <a href="/">
                    <div class="flex flex-col space-y-1.5 p-6">
                        <div class="flex justify-between items-start">
                            <h3 class="font-semibold leading-none tracking-tight flex items-center gap-2 pb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-database h-6 w-6">
                                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                                    <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
                                    <path d="M3 12A9 3 0 0 0 21 12"></path>
                                </svg>
                                <span class="text-lg">{name}</span>
                            </h3>
                        </div>
                        <p class="text-muted-foreground min-h-[4rem] line-clamp-3 text-base">{description}</p>
                    </div>
                </a>
                {/* <div class="p-6 flex-1 flex flex-col justify-end pt-0">
                    <div class="flex flex-wrap gap-2">
                        <a href="/tags/community">
                            <div class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-secondary-foreground bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer">Community</div>
                        </a>
                        <a href="/tags/database">
                            <div class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-secondary-foreground bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer">Database</div>
                        </a>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default ServerCard
