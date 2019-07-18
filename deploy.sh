echo "Starting deployment"
echo "   Building..."
ng build --prod --no-progress

echo "  Deploying archive"
scp -r dist/cheryl-client pi@192.168.178.40:/home/pi/
