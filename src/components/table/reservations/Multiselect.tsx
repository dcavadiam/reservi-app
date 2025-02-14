import Multiselect from 'multiselect-react-dropdown';
import { Tag } from '@/types/tag';
import { useTagsContext } from '@/context/tagsContext';
import "@/components/table/reservations/tag-input.css"


const options: Tag[] = [
    { name: 'Nombre', value: 'name', id: 1 },
    { name: 'Email', value: 'email', id: 2 },
    { name: 'Teléfono', value: 'phone', id: 3 },
];

export const MultiSelect = () => {
    const { tags, setTags } = useTagsContext();

    const onSelect = (selectedList: Tag[]) => {
        setTags(selectedList);
    };

    const onRemove = (selectedList: Tag[]) => {
        setTags(selectedList);
    };

    return (
        <Multiselect
            options={options}
            selectedValues={tags}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            placeholder=''
        />
    );
};

