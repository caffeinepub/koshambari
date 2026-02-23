import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Smartphone } from 'lucide-react';

interface UpiPaymentProps {
  amount: number;
  onSuccess: () => void;
  onFailure: () => void;
}

export default function UpiPayment({ amount, onSuccess, onFailure }: UpiPaymentProps) {
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        onSuccess();
      } else {
        onFailure();
      }
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>UPI Payment</CardTitle>
        <p className="text-sm text-muted-foreground">
          Pay securely using UPI - India's fastest payment method
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upi-id" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upi-id">
              <Smartphone className="mr-2 h-4 w-4" />
              UPI ID
            </TabsTrigger>
            <TabsTrigger value="qr-code">
              <QrCode className="mr-2 h-4 w-4" />
              QR Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upi-id" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="upi-id">Enter your UPI ID</Label>
              <Input
                id="upi-id"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Example: 9876543210@paytm, yourname@googlepay
              </p>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Amount to Pay</span>
                <span className="font-serif text-2xl font-bold text-primary">
                  ₹{amount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handlePayment}
              disabled={!upiId || isProcessing}
            >
              {isProcessing ? 'Processing Payment...' : 'Pay Now'}
            </Button>
          </TabsContent>

          <TabsContent value="qr-code" className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-lg border-2 border-primary/20 bg-white p-4">
                <div className="flex h-48 w-48 items-center justify-center bg-muted">
                  <QrCode className="h-32 w-32 text-muted-foreground" />
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Scan this QR code with any UPI app to pay
              </p>

              <div className="w-full rounded-lg bg-muted/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Amount to Pay</span>
                  <span className="font-serif text-2xl font-bold text-primary">
                    ₹{amount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? 'Verifying Payment...' : 'I have paid'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <span>Supported UPI Apps:</span>
          <span className="font-medium">Google Pay</span>
          <span>•</span>
          <span className="font-medium">PhonePe</span>
          <span>•</span>
          <span className="font-medium">Paytm</span>
        </div>
      </CardContent>
    </Card>
  );
}
