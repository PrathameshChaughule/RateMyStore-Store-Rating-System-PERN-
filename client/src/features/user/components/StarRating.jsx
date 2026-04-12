function StarRating({ selectedRating, setSelectedRating }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => setSelectedRating(star)}
                    className={`cursor-pointer text-4xl ${star <= selectedRating ? "text-amber-400" : "text-gray-300"
                        }`}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

export default StarRating