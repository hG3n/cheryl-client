echo "Starting deployment"
echo "   Building..."
ng build --configuration=production --no-progress

echo "  Deploying archive"
scp -r dist/cheryl-client pi@192.168.178.25:/home/pi/static/
