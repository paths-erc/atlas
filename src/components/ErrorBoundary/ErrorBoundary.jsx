import { Component } from 'react';
import { Alert, Button } from 'reactstrap';

export default class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="container mt-5">
        <Alert color="danger">
          <h4 className="alert-heading">Something went wrong</h4>
          <p>An unexpected error occurred. You can try reloading the page.</p>
          <pre className="mb-3 text-danger" style={{ fontSize: '0.8rem' }}>
            {this.state.error.message}
          </pre>
          <Button color="danger" outline onClick={() => window.location.reload()}>
            Reload page
          </Button>
        </Alert>
      </div>
    );
  }
}
