#!/usr/bin/env ts-node

import { spawn, ChildProcess } from 'child_process';
import * as browserSync from 'browser-sync';
import * as path from 'path';

interface DevProcess {
  name: string;
  process: ChildProcess;
}

class DevServer {
  private processes: DevProcess[] = [];
  private bs: browserSync.BrowserSyncInstance | null = null;

  constructor() {
    this.setupSignalHandlers();
  }

  private setupSignalHandlers(): void {
    process.on('SIGINT', () => this.cleanup());
    process.on('SIGTERM', () => this.cleanup());
    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      this.cleanup();
    });
  }

  private startProcess(name: string, command: string, args: string[], cwd?: string): ChildProcess {
    console.log(`Starting ${name}...`);
    const childProcess = spawn(command, args, {
      stdio: 'inherit',
      cwd: cwd || process.cwd(),
      shell: true
    });

    childProcess.on('error', (error) => {
      console.error(`Error starting ${name}:`, error);
    });

    childProcess.on('exit', (code) => {
      if (code !== 0) {
        console.error(`${name} exited with code ${code}`);
      }
    });

    return childProcess;
  }

  private startTypeScriptCompiler(): ChildProcess {
    return this.startProcess(
      'TypeScript Compiler',
      'npx',
      ['tsc', '--watch', '--project', 'tsconfig.json']
    );
  }

  private startClientTypeScriptCompiler(): ChildProcess {
    return this.startProcess(
      'Client TypeScript Compiler',
      'npx',
      ['tsc', '--watch', '--project', 'tsconfig.client.json']
    );
  }

  private startEleventy(): ChildProcess {
    return this.startProcess(
      'Eleventy',
      'npx',
      ['eleventy', '--config=.eleventy.ts', '--serve', '--watch', '--quiet']
    );
  }

  private startTailwindCSS(): ChildProcess {
    return this.startProcess(
      'Tailwind CSS',
      'npx',
      ['tailwindcss', '-i', 'src/styles/tailwind.css', '-o', 'public/assets/styles.css', '--watch']
    );
  }

  private startBrowserSync(): void {
    console.log('Starting Browser-Sync...');
    this.bs = browserSync.create();
    this.bs.init({
      proxy: 'localhost:8080', // Eleventy's default port
      files: [
        '_site/**/*',
        'public/assets/**/*'
      ],
      open: false,
      notify: false,
      logLevel: 'info',
      reloadDelay: 1000
    });
  }

  public async start(): Promise<void> {
    console.log('🚀 Starting development server...\n');

    // Start all processes
    this.processes.push({
      name: 'TypeScript Compiler',
      process: this.startTypeScriptCompiler()
    });

    this.processes.push({
      name: 'Client TypeScript Compiler',
      process: this.startClientTypeScriptCompiler()
    });

    this.processes.push({
      name: 'Tailwind CSS',
      process: this.startTailwindCSS()
    });

    this.processes.push({
      name: 'Eleventy',
      process: this.startEleventy()
    });

    // Wait a bit for Eleventy to start
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Start Browser-Sync
    this.startBrowserSync();

    console.log('\n✅ Development server started!');
    console.log('📱 Site: http://localhost:8080');
    console.log('🔄 Browser-Sync: http://localhost:3000');
    console.log('\nPress Ctrl+C to stop all processes\n');
  }

  private cleanup(): void {
    console.log('\n🛑 Shutting down development server...');

    // Kill all processes
    this.processes.forEach(({ name, process }) => {
      console.log(`Stopping ${name}...`);
      process.kill('SIGTERM');
    });

    // Stop Browser-Sync
    if (this.bs) {
      this.bs.exit();
    }

    console.log('✅ Development server stopped');
    process.exit(0);
  }
}

// Start the development server
const devServer = new DevServer();
devServer.start().catch((error) => {
  console.error('Failed to start development server:', error);
  process.exit(1);
});
