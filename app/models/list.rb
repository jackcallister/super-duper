class List

  def initialize(meal_ids:, user:)
    @meals = get_meals(meal_ids)
    @user = user

    deliver
  end

private

  def get_meals(meal_ids)
    meals = []

    meal_ids.each do |id|
      meals << Meal.find(id)
    end

    meals
  end

  def deliver
    ListMailer.list(@meals, @user).deliver
  end
end
