class FoodsFactory {
	create(type) {
		throw new Error("此方法必须要重写")
	}
}

module.exports = FoodsFactory