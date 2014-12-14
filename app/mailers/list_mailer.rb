class ListMailer < ActionMailer::Base
  default from: 'noreply@super-duper.com'

  def list(meals, user)
    @meals = meals
    mail(to: user.email, subject: 'Super Duper Shopping List')
  end
end
