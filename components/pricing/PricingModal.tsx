import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { pricingPlans, type PricingPlan } from '@/data/qrcode';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '@/lib/utils';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(pricingPlans[0]);

  const handleClose = (action: 'problem' | 'success') => {
    // 只有点击按钮时才关闭弹窗
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      // 点击背景或按 ESC 键时不关闭弹窗
      return;
    }}>
      <DialogContent className="sm:max-w-[480px] bg-white">
        <div className="text-center mb-6">
          <DialogTitle className="text-2xl font-bold">购买积分</DialogTitle>
          <p className="text-gray-500 mt-2">选择合适的套餐以获取更多积分</p>
        </div>

        <div className="grid grid-cols-5 gap-3 mb-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "border rounded-lg p-3 cursor-pointer transition-all relative h-[120px] flex items-center justify-center",
                selectedPlan.id === plan.id
                  ? "bg-green-100 border-green-100"
                  : "border-gray-200 hover:border-green-500 bg-white"
              )}
              onClick={() => setSelectedPlan(plan)}
            >
              <div className="absolute -top-1.5 -right-1.5">
                <div className="bg-green-500 text-white text-xs rounded-sm px-1.5 py-0.5">
                  {((plan.price / plan.originalPrice) * 10).toFixed(1)}折
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-600">{plan.points}积分</div>
                <div className="font-bold text-2xl mt-1 text-black">¥{plan.price}</div>
                <div className="text-gray-400 text-xs line-through mt-0.5">
                  ¥{plan.originalPrice}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <QRCodeSVG value={selectedPlan.qrcodeUrl} size={200} />
          <div className="text-sm text-gray-500 mt-2.5">
            请使用微信扫码支付
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => handleClose('problem')}>
            支付遇到问题
          </Button>
          <Button variant="default" className="bg-green-500" onClick={() => handleClose('success')}>
            我已支付完成
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 