import { useContext, createContext, ReactNode, useState } from "react";
import { TagContextType } from "@/types/context";
import { Tag } from "@/types/tag";

// Create a context object
export const TagsContext = createContext<TagContextType|undefined>(undefined);

// Create a provider component that will wrap your app and make the context available to any child component
export function TagsProvider({ children }: { children: ReactNode }) {
    const [tags, setTags] = useState<Tag[]>([]);

    return (
        <TagsContext.Provider value={{ tags, setTags }}>
            {children}
        </TagsContext.Provider>
    );
}

// Use the useTagsContext hook to access the tags array and other functions
export function useTagsContext() {
    const context = useContext(TagsContext);
    if (!context) {
        throw new Error("useTagsContext must be used within a TagsProvider");
    }
    return context;
}