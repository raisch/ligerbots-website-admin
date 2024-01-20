const path = require('node:path')

module.exports = {
  DEBUGGING: true,
  title: 'Admin',
  description: 'Ligerbots Admin Management System',
  schools: ['North', 'South', 'none'],
  types: ['student', 'coach', 'mentor', 'parent', 'other'],
  roles: ['user', 'editor', 'admin', 'superuser'],
  grades: ['none', '9', '10', '11', '12'],
  defaults: {
    school: 'none',
    grade: 'none',
    type: 'student',
    role: 'user'
  },
  paths: {
    static: path.resolve(__dirname, './../../public/_pages')
  }
}
