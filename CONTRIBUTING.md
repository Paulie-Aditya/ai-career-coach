# 🤝 Contributing to AI Career Coach

Thank you for your interest in contributing to AI Career Coach! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## 📜 Code of Conduct

This project follows a code of conduct that we expect all contributors to follow:

- **Be respectful** - Treat everyone with respect and kindness
- **Be inclusive** - Welcome contributors from all backgrounds
- **Be constructive** - Provide helpful feedback and suggestions
- **Be patient** - Remember that everyone is learning and growing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+ and pip
- Git
- Google Cloud account (for API keys)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

   ```bash
   git clone https://github.com/your-username/ai-career-coach.git
   cd ai-career-coach
   ```

3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/aicareercoach/ai-career-coach.git
   ```

## 🛠️ Development Setup

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp env_example.txt .env
# Edit .env with your API keys

# Run the server
python main.py
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Setup environment variables
cp env_example.txt .env.local
# Edit .env.local with API URL

# Run the development server
npm run dev
```

### Full Stack Development

```bash
# Install all dependencies
npm run install-all

# Run both frontend and backend
npm run dev
```

## 📝 Contributing Guidelines

### Types of Contributions

We welcome various types of contributions:

- **Bug fixes** - Fix issues and improve stability
- **New features** - Add new functionality
- **Documentation** - Improve docs and examples
- **Testing** - Add or improve tests
- **Performance** - Optimize code and improve speed
- **UI/UX** - Improve user interface and experience

### Before Contributing

1. **Check existing issues** - Look for existing issues or discussions
2. **Create an issue** - For significant changes, create an issue first
3. **Discuss changes** - Get feedback before implementing
4. **Follow the roadmap** - Align with project goals and priorities

## 🔄 Pull Request Process

### Creating a Pull Request

1. **Create a branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:

   - Write clean, well-documented code
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**:

   ```bash
   # Run backend tests
   python scripts/test-backend.py

   # Run frontend tests
   node scripts/test-frontend.js

   # Run all tests
   ./scripts/run-tests.sh  # Linux/Mac
   # or
   scripts\run-tests.bat   # Windows
   ```

4. **Commit your changes**:

   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**:
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Fill out the PR template
   - Request review from maintainers

### Pull Request Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tests pass locally
- [ ] New tests added
- [ ] Manual testing completed

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🐛 Issue Reporting

### Before Creating an Issue

1. **Search existing issues** - Check if the issue already exists
2. **Check documentation** - Look for solutions in docs
3. **Try latest version** - Ensure you're using the latest code

### Creating an Issue

Use the appropriate issue template:

- **Bug Report** - For bugs and issues
- **Feature Request** - For new features
- **Documentation** - For documentation improvements
- **Question** - For questions and help

### Issue Template

```markdown
## Description

Clear description of the issue

## Steps to Reproduce

1. Step one
2. Step two
3. Step three

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- OS: [e.g., Windows 10]
- Node.js: [e.g., 18.17.0]
- Python: [e.g., 3.9.0]
- Browser: [e.g., Chrome 91]

## Additional Context

Any additional information
```

## 📏 Coding Standards

### Python (Backend)

- **Style**: Follow PEP 8
- **Type Hints**: Use type hints for all functions
- **Docstrings**: Document all functions and classes
- **Imports**: Organize imports (standard, third-party, local)

```python
def example_function(param1: str, param2: int) -> Dict[str, Any]:
    """
    Example function with proper documentation.

    Args:
        param1: Description of param1
        param2: Description of param2

    Returns:
        Dictionary with results
    """
    pass
```

### TypeScript/JavaScript (Frontend)

- **Style**: Follow ESLint configuration
- **Type Safety**: Use TypeScript for all new code
- **Components**: Use functional components with hooks
- **Naming**: Use descriptive, camelCase names

```typescript
interface ExampleProps {
  title: string;
  count: number;
}

const ExampleComponent: React.FC<ExampleProps> = ({ title, count }) => {
  return (
    <div>
      {title}: {count}
    </div>
  );
};
```

### CSS/Styling

- **Framework**: Use Tailwind CSS
- **Responsive**: Mobile-first approach
- **Consistency**: Follow design system
- **Performance**: Optimize for speed

## 🧪 Testing

### Backend Testing

```bash
# Run all backend tests
python scripts/test-backend.py

# Run specific test
python -m pytest tests/test_specific.py
```

### Frontend Testing

```bash
# Run all frontend tests
node scripts/test-frontend.js

# Run Next.js tests
cd frontend && npm test
```

### Test Coverage

- **Backend**: Aim for 80%+ coverage
- **Frontend**: Test all components and utilities
- **Integration**: Test API endpoints and data flow
- **E2E**: Test complete user workflows

## 📚 Documentation

### Code Documentation

- **Functions**: Document all public functions
- **Classes**: Document all classes and methods
- **APIs**: Document all API endpoints
- **Examples**: Provide usage examples

### User Documentation

- **README**: Keep main README updated
- **Setup Guide**: Maintain setup instructions
- **API Docs**: Keep API documentation current
- **Screenshots**: Update screenshots for UI changes

### Documentation Standards

- **Markdown**: Use proper Markdown formatting
- **Code Blocks**: Use syntax highlighting
- **Links**: Use relative links when possible
- **Images**: Optimize images for web

## 🏷️ Release Process

### Version Numbering

We use [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] Version numbers updated
- [ ] Changelog updated
- [ ] Release notes written
- [ ] Tag created
- [ ] Release published

## 🤔 Questions?

If you have questions about contributing:

- **GitHub Discussions**: Use the Discussions tab
- **Issues**: Create an issue with the "question" label
- **Email**: contact@aicareercoach.com
- **Discord**: [Community Server](https://discord.gg/aicareercoach)

## 🙏 Recognition

Contributors will be recognized in:

- **README**: Contributor list
- **Releases**: Release notes
- **Documentation**: Contributor acknowledgments
- **Social Media**: Project updates

---

**Thank you for contributing to AI Career Coach! Together, we can empower students with AI-powered career guidance.** 🚀
