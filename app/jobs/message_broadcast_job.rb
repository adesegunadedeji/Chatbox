class MessageBroadcastJob < ApplicationJob
    queue_as :default
    def perfrom(message)
        ActionCable.server.broadcast "chat", {
    	message: render_message(message)
    }
    end
    private
    def render_message(message)
        MessagesController.render(
            partial: 'message',
            locals: {
                message: message
            }
        )
    end
end