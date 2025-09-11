import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type BaseModalProps = {
  open: boolean;
  icon: React.ReactNode;
  onClose: () => void;
  title: string;
  description?: string;
  error?: string | React.ReactNode;
  children: React.ReactNode;
};

export function BaseModal({
  open,
  icon,
  onClose,
  title,
  description,
  error,
  children,
}: BaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            {icon}
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">{title}</DialogTitle>
            {description && (
              <DialogDescription className="sm:text-center">
                {description}
              </DialogDescription>
            )}
            <DialogDescription className="sm:text-center text-red-600 text-xs">
              {error}
            </DialogDescription>
          </DialogHeader>
        </div>
        {children}
      </DialogContent>
    </Dialog>
  );
}
