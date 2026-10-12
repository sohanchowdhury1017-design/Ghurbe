import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = window.location.origin + window.location.pathname.split('#')[0];
  };

  private handleClearDataAndReload = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-800/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl text-center">
            <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-500/30">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold mb-2 text-white">
              একটি সমস্যা দেখা দিয়েছে
            </h1>
            <p className="text-sm text-slate-300 mb-6">
              পেজটি লোড হতে সাময়িক ত্রুটি হয়েছে। নিচের বোতামে চাপ দিয়ে আবার চেষ্টা করুন।
            </p>

            <div className="space-y-3">
              <button
                onClick={this.handleReload}
                className="w-full py-3 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-sky-500/20"
              >
                <RefreshCw className="w-4 h-4" />
                পেজ রিলোড করুন (Reload)
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full py-2.5 px-4 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-sm"
              >
                <Home className="w-4 h-4" />
                হোমপেজে ফিরে যান
              </button>

              <button
                onClick={this.handleClearDataAndReload}
                className="w-full py-2 px-4 bg-transparent hover:bg-rose-500/10 text-rose-400 hover:text-rose-300 font-medium rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                ক্যাশ/ডাটা রিসেট করে রিলোড
              </button>
            </div>

            {this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-300">
                  কারিগরি তথ্য (Technical Details)
                </summary>
                <pre className="mt-2 p-3 bg-slate-950/70 rounded-lg text-[11px] text-rose-300 font-mono overflow-x-auto whitespace-pre-wrap max-h-40 border border-slate-700/50">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
