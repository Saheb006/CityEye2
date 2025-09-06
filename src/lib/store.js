// Simple localStorage-based store for CityEye demo data

// Auto-categorization keywords
const CATEGORY_KEYWORDS = {
  roadways: ['road', 'pothole', 'street', 'highway', 'pavement', 'traffic light', 'sign'],
  environmental: ['pollution', 'waste', 'garbage', 'tree', 'park', 'air', 'water', 'noise'],
  community: ['community', 'safety', 'crime', 'lighting', 'security', 'vandalism'],
  sewage: ['sewage', 'drainage', 'water', 'leak', 'pipe', 'overflow', 'sewer'],
  traffic: ['traffic', 'parking', 'vehicle', 'signal', 'jam', 'congestion', 'speed'],
  general: ['other', 'miscellaneous', 'complaint', 'suggestion']
}

export function categorizeIssue(title, description) {
  const text = `${title} ${description}`.toLowerCase()
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }
  
  return 'General'
}

export function getIssues() {
  const issues = localStorage.getItem('cityeye-issues')
  return issues ? JSON.parse(issues) : []
}

export function saveIssue(issue) {
  const issues = getIssues()
  const newIssue = {
    ...issue,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    likes: 0,
    likedBy: []
  }
  
  issues.push(newIssue)
  localStorage.setItem('cityeye-issues', JSON.stringify(issues))
  return newIssue
}

export function updateIssue(id, updates) {
  const issues = getIssues()
  const index = issues.findIndex(issue => issue.id === id)
  if (index !== -1) {
    issues[index] = { ...issues[index], ...updates }
    localStorage.setItem('cityeye-issues', JSON.stringify(issues))
  }
}

export function deleteIssue(id) {
  const issues = getIssues().filter(issue => issue.id !== id)
  localStorage.setItem('cityeye-issues', JSON.stringify(issues))
}

export function likeIssue(issueId, userId) {
  const issues = getIssues()
  const issue = issues.find(i => i.id === issueId)
  if (issue) {
    if (issue.likedBy.includes(userId)) {
      issue.likedBy = issue.likedBy.filter(id => id !== userId)
      issue.likes--
    } else {
      issue.likedBy.push(userId)
      issue.likes++
    }
    localStorage.setItem('cityeye-issues', JSON.stringify(issues))
  }
}

export function getUsers() {
  const users = localStorage.getItem('cityeye-users')
  return users ? JSON.parse(users) : []
}

export function saveUser(user) {
  const users = getUsers()
  const newUser = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  }
  
  users.push(newUser)
  localStorage.setItem('cityeye-users', JSON.stringify(users))
  return newUser
}

export function getCurrentUser() {
  const userId = localStorage.getItem('cityeye-current-user')
  if (!userId) return null
  
  const users = getUsers()
  return users.find(user => user.id === userId) || null
}

export function setCurrentUser(userId) {
  localStorage.setItem('cityeye-current-user', userId)
}

export function logout() {
  localStorage.removeItem('cityeye-current-user')
}

export function banUser(userId) {
  const users = getUsers()
  const user = users.find(u => u.id === userId)
  if (user) {
    user.banned = true
    localStorage.setItem('cityeye-users', JSON.stringify(users))
  }
}

export function getCommunityStats() {
  const issues = getIssues()
  const users = getUsers().filter(u => !u.banned)
  
  return {
    totalIssues: issues.length,
    resolvedIssues: issues.filter(i => i.status === 'resolved').length,
    activeMembers: users.length,
    openIssues: issues.filter(i => i.status !== 'resolved').length
  }
}