import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error);
        console.error(errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Something went wrong</h2>
                    <p>We're sorry, but an error occurred.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
