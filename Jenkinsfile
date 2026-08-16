pipeline {
    agent any

    stages {
        stage('Environment') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
                sh 'node dist/app.js'
                sh 'ls -l dist/app.js'
            }
        }

        stage('Secret Check') {
            steps {
                withCredentials([string(credentialsId: 'demo-secret', variable: 'DEMO_SECRET')]) {
                    sh 'test -n "$DEMO_SECRET"'
                    echo 'Secret loaded securely without displaying it.'
                }
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
                echo 'Build artifact archived successfully.'
            }
        }

        stage('Deploy') {
            steps {
                sh 'mkdir -p /var/lib/jenkins/deployments/jenkins-practice'
                sh 'cp dist/app.js /var/lib/jenkins/deployments/jenkins-practice/app.js'
                sh 'node /var/lib/jenkins/deployments/jenkins-practice/app.js'
                echo 'Application deployed locally.'
            }
        }
    }

    post {
        success {
            echo 'Node.js CI pipeline completed successfully!'
        }

        failure {
            echo 'Node.js CI pipeline failed. Check Console Output.'
        }
    }
}
