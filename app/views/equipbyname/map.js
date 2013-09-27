function(doc) {
	if (doc._id.substr(0,5) === "name:") {
		emit(doc._id.substr(5), {
			"rev": doc._rev,
			"name": doc.name,
			"slot": doc.slot,
			"level": doc.level,
			"note": doc.note
		});
	}
};