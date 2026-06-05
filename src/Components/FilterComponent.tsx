type FilterFieldProps = {
    label: string;
    enabled: boolean;
    onEnabledChange: (enabled: boolean) => void;
};

export function FilterField({
    label,
    enabled,
    onEnabledChange,
}: FilterFieldProps) {
    return (
        <>
            <label>
                <input 
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => onEnabledChange(e.target.checked)}
                />
                {label}
            </label>
        </>
    )
}