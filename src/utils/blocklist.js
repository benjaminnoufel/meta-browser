const blocklist = []

/**
 * @param {string} site
 */
export function isBlocked(site) {
	for (const item of blocklist) {
		if (site.includes(item)) {
			return true
		}
	}
	return false
}
